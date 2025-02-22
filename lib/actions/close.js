const { Action } = require('./action')

const closeIssue = async (context, issueNumber) => {
  return context.github.issues.update(
    context.repo({ issue_number: issueNumber, state: 'closed' })
  )
}

class Close extends Action {
  constructor () {
    super('close')
    this.supportedEvents = [
      'pull_request.*',
      'issues.*',
      'schedule.repository'
    ]
  }

  // there is nothing to do
  async beforeValidate () {}

  async afterValidate (context, settings, name, results) {
    let scheduleResults = results && results.validationSuites && results.validationSuites[0].schedule
    let items = (scheduleResults)
      ? scheduleResults.issues.concat(scheduleResults.pulls)
      : [this.getPayload(context)]
    return Promise.all(
      items.map(issue => {
        closeIssue(
          context,
          issue.number
        )
      })
    )
  }
}

module.exports = Close
