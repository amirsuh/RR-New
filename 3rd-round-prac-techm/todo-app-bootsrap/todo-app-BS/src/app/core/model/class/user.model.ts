export class BatchModel {
  batchId: number
  batchName: string
  description: string
  startDate: string
  endDate: string
  isActive: boolean
  createdAt: string
  updatedAt: string

  constructor() {
    this.batchId = 0
    this.batchName = ''
    this.description = ''
    this.startDate = ''
    this.endDate = ''
    this.isActive = false
    this.createdAt = ''
    this.updatedAt = ''
  }
}
