import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from 'components/layout/Basic'
import SEO from 'components/SEO'
import { Flex } from 'components/Grid'
import Map from 'components/Map'
import MapSidebar from 'components/Map/Sidebar'
import styled from 'util/style'

const Wrapper = styled(Flex).attrs({
  flexDirection: ['column', 'column', 'row'],
})`
  flex: 1 1 auto;
  height: 100%;
`

const Template = ({
  data: {
    json: {
      id,
      path,
      itemType,
      commonName,
      habitat,
      conservationAsset,
      area,
      slr1m,
      slr3m,
      bounds,
    },
  },
}) => {
  const name =
    itemType === 'species' ? commonName : habitat || conservationAsset
  return (
    <Layout>
      <SEO title={name} />
      <Wrapper>
        <MapSidebar
          id={id}
          path={path}
          name={name}
          area={area}
          slr1m={slr1m}
          slr3m={slr3m}
        />
        <Map id={id} bounds={bounds} />
      </Wrapper>
    </Layout>
  )
}

Template.propTypes = {
  data: PropTypes.shape({
    json: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default Template

export const pageQuery = graphql`
  query($id: String!) {
    json(id: { eq: $id }) {
      id
      path
      itemType
      commonName
      habitat
      conservationAsset
      area
      slr1m
      slr3m
      bounds
    }
  }
`
