import Joi from 'joi'

export const updateBeaconEndpointsSchema = Joi.object({
  beaconEndpoints: Joi.array().items(Joi.string()).min(1).messages({
    'array.min': 'You need to enter at least 1 beacon endpoint',
  }),
})
