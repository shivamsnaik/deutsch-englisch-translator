import 'react-native'
import * as renderer from 'react-test-renderer'
import Index from './Index'
import React from 'react'

test('Renders Properly', () => {
  const tree = renderer.create(
    <Index/>
  )

  expect(tree).toBeDefined()
})