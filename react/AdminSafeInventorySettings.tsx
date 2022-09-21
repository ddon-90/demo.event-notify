import React, { FC, useState } from 'react'
import { useMutation, useQuery } from 'react-apollo'
// import { FormattedMessage } from 'react-intl'
import { Layout, PageBlock, PageHeader, Input, Button, Spinner } from 'vtex.styleguide'
import saveConfigGQL from './graphql/saveConfig.gql'
import getConfigGQL from './graphql/getConfig.gql'

const AdminSafeInventorySettings: FC = () => {
  const [safeInventoryLimit, setSafeInventoryLimit] = useState("")
  const [isLoading, setLoading] = useState(true)

  useQuery(getConfigGQL, { onCompleted: ({ config }) => {
    console.log("config", config)
    setSafeInventoryLimit(config.safeInventoryLimit)
    setLoading(false)
  }})

  const [saveConfig] = useMutation(saveConfigGQL, {
    onCompleted: () =>
      setLoading(false)
  })

  return (
    <Layout
      pageHeader={
        <PageHeader
          title="Settings"
        />
      }
    >
      <PageBlock variation="full">

        {isLoading &&
          <span className="dib c-muted-1">
            <Spinner /><br /><br />
          </span>
        }

        <h5>Safe Inventory Limit</h5>

        <Input
          placeholder="0"
          value={safeInventoryLimit}
          onChange={(e: any) => setSafeInventoryLimit(e.target.value)}
        />

        <br />

        <Button
          onClick={() => {
            setLoading(true)
            saveConfig({ variables: { safeInventoryLimit } })
          }}
        >
          Save
        </Button>
      </PageBlock>
    </Layout>
  )
}

export default AdminSafeInventorySettings
