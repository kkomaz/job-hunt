import { Model } from 'radiks'

export default class Job extends Model {
  static className = 'Job'

  static schemea = {
    company: {
      type: String,
      encrypt: false,
    },
    location: {
      type: String,
      encrypt: false,
    },
    title: {
      type: String,
      encrypt: false,
    },
    type: {
      type: String,
      encrypt: false,
    },
    job_place: {
      type: String,
      encrypt: false,
    },
    category: {
      type: String,
      encrypt: false,
    },
    description: {
      type: String,
      encrypt: false,
    }
  }
}