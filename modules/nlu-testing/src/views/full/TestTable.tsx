import { Button, H4, HTMLTable, Icon, Position, Tooltip } from '@blueprintjs/core'
import React, { FC } from 'react'

import { Test, TestResult } from './api'

interface TestResultProps {
  testResult?: TestResult
}
const TestResult: FC<TestResultProps> = ({ testResult }) => {
  if (testResult === undefined) {
    return <span>-</span>
  }
  if (testResult.success) {
    return <Icon icon="tick-circle" intent="success" />
  } else {
    const content = (
      <div>
        {testResult.details
          .filter(r => !r.success)
          .map(r => (
            <p>{r.reason}</p>
          ))}
      </div>
    )
    return (
      <Tooltip position={Position.LEFT} content={content}>
        <Icon icon="warning-sign" intent="danger" />
      </Tooltip>
    )
  }
}

interface Props {
  tests: Test[]
  testResults: _.Dictionary<TestResult>
  createTest: () => void
}

export const TestTable: FC<Props> = props => (
  <React.Fragment>
    <H4>
      NLU System Tests &nbsp;
      <Button type="button" minimal intent="success" small icon="add" onClick={props.createTest} text="New Test" />
    </H4>
    <HTMLTable bordered striped>
      <thead>
        <tr>
          <th>Utterance</th>
          <th>Context</th>
          <th>Conditions</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        {props.tests.map(test => (
          <tr key={test.id}>
            {/* TODO edit utterance in place */}
            <td>{test.utterance}</td>
            <td>{test.context}</td>
            <td>{test.conditions.map(c => c.join('-')).join(' | ')}</td>
            <td>
              <TestResult testResult={props.testResults[test.id]} />
            </td>
          </tr>
        ))}
      </tbody>
    </HTMLTable>
  </React.Fragment>
)