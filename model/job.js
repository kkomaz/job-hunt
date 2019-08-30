import { Model } from 'radiks'

export default class Job extends Model {
  static className = 'Job'

  static schemea = {
    address: {
      type: String,
      encrypt: false,
    },
    job_uuid: {
      type: String,
      encrypt: false,
    }
  }
}