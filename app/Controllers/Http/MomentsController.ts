import { v4 as uuid } from 'uuid'
import Application from '@ioc:Adonis/Core/Application'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Moment from 'App/Models/Moment'

export default class MomentsController {
  private validationFile = {
    types: ['image'],
    size: '2mb',
  }

  public async store({ request, response }: HttpContextContract) {
    const body = request.body()
    const image = request.file('image', this.validationFile)

    if (image) {
      const imageName = `${uuid()}.${image.extname}`

      await image.move(Application.tmpPath('uploads'), {
        name: imageName,
      })

      body.image = imageName
    }

    const moment = await Moment.create(body)

    response.status(201)

    return {
      message: 'Moment criado com sucesso',
      data: moment,
    }
  }

  public async index() {
    const moment = await Moment.query().preload('comments')
    return {
      data: moment,
    }
  }

  public async show({ params }: HttpContextContract) {
    const moment = await Moment.findOrFail(params.id)
    await moment.load('comments')

    return {
      data: moment,
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const moment = await Moment.findOrFail(params.id)
    moment.delete()

    return {
      data: `Moment: ${moment.title} deletado com sucesso`,
    }
  }

  public async update({ request, params }: HttpContextContract) {
    const body = request.body()

    const moment = await Moment.findOrFail(params.id)

    moment.title = body.title
    moment.description = body.description

    const image = request.file('image', this.validationFile)

    if (image) {
      const imageName = `${uuid()}.${image.extname}`

      await image.move(Application.tmpPath('uploads'), {
        name: imageName,
      })

      moment.image = imageName
    }

    moment.save()

    return {
      message: 'Moment atualizado com sucesso!',
      data: moment,
    }
  }
}
