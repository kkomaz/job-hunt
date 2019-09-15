import { Model } from 'radiks'

export default class Job extends Model {
  static className = 'Job'

  static schema = {
    creator: {
      type: String,
      decrypted: true,
    },
    company: {
      type: String,
      decrypted: true
    },
    location: {
      type: String,
      decrypted: true
    },
    title: {
      type: String,
      decrypted: true
    },
    type: {
      type: String,
      decrypted: true
    },
    job_place: {
      type: String,
      decrypted: true
    },
    category: {
      type: String,
      decrypted: true
    },
    description: {
      type: String,
      decrypted: true
    }
  }
}