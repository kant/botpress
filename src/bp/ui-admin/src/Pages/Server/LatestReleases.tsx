import _ from 'lodash'
import React, { FC, useEffect } from 'react'
import { connect } from 'react-redux'
import snarkdown from 'snarkdown'
import PageContainer from '~/App/PageContainer'

import linux from '../../media/linux.png'
import mac from '../../media/mac.png'
import window from '../../media/windows.png'
import { fetchLatestVersions } from '../../reducers/versions'

interface GithubRelease {
  version: string
  details: string
  githubUrl: string
  releaseDate: Date
  daysAgo: string
}

const DownloadLinks: FC<{ version: string }> = props => {
  const version = `v${props.version.replace(/\./g, '_')}`

  return (
    <div className="downloads">
      Download binary
      <hr />
      <a href={`https://s3.amazonaws.com/botpress-binaries/botpress-${version}-darwin-x64.zip`} target="_blank">
        <img src={mac} /> Mac
      </a>
      <br />
      <a href={`https://s3.amazonaws.com/botpress-binaries/botpress-${version}-win-x64.zip`} target="_blank">
        <img src={window} /> Windows
      </a>
      <br />
      <a href={`https://s3.amazonaws.com/botpress-binaries/botpress-${version}-linux-x64.zip`} target="_blank">
        <img src={linux} /> Linux
      </a>
      <br />
      <br />
      Docker Image
      <hr />
      <a href="https://hub.docker.com/r/botpress/server" target="_blank">
        <code>botpress/server:{version}</code>
      </a>
    </div>
  )
}

const LastRelease: FC<{ latestReleases: GithubRelease[]; fetchLatestVersions: Function }> = props => {
  useEffect(() => {
    props.fetchLatestVersions()
  }, [])

  return (
    <PageContainer title="Latest Releases">
      <div className="releases">
        {props.latestReleases.map(release => {
          return (
            <div key={release.version}>
              <div className="version">
                {release.version}
                <span>published {release.daysAgo}</span>
              </div>

              <div className="container">
                <div className="content" dangerouslySetInnerHTML={{ __html: snarkdown(release.details) }} />
                <DownloadLinks version={release.version} />
              </div>
            </div>
          )
        })}
      </div>
    </PageContainer>
  )
}

const mapStateToProps = state => ({ latestReleases: state.version.latestReleases })
const mapDispatchToProps = { fetchLatestVersions }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LastRelease)
