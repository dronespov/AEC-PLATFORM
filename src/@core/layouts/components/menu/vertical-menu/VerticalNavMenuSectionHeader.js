// ** Third Party Components
import { FormattedMessage } from 'react-intl'
import { MoreHorizontal } from 'react-feather'

const VerticalNavMenuSectionHeader = ({ item, index }) => {
  return (
    <li className='navigation-header mt-3'>
      <span className='d-none'>
        <FormattedMessage id={item.header} />
      </span>
      <MoreHorizontal className='feather-more-horizontal' />
    </li>
  )
}

export default VerticalNavMenuSectionHeader
