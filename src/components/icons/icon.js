import React from 'react'
import PropTypes from 'prop-types'
import {
  IconAppStore,
  IconBookmark,
  IconExternal,
  IconFolder,
  IconFork,
  IconGitHub,
  IconInstagram,
  IconLinkedin,
  IconPlayStore,
  IconStar,
  IconTwitter
} from '@components/icons'

const Icon = ({ name }) => {
  switch (name) {
    case 'AppStore':
      return <IconAppStore />
    case 'Bookmark':
      return <IconBookmark />
    case 'External':
      return <IconExternal />
    case 'Folder':
      return <IconFolder />
    case 'Fork':
      return <IconFork />
    case 'GitHub':
      return <IconGitHub />
    case 'Instagram':
      return <IconInstagram />
    case 'Linkedin':
      return <IconLinkedin />
    case 'PlayStore':
      return <IconPlayStore />
    case 'Star':
      return <IconStar />
    case 'Twitter':
      return <IconTwitter />
    default:
      return <IconExternal />
  }
}

Icon.propTypes = {
  name: PropTypes.string.isRequired
}

export default Icon
