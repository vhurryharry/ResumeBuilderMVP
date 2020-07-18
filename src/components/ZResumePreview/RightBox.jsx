import React from 'react'
import PropTypes from 'prop-types'
import SectionSummary from './SectionSummary'
import SectionExpr from './SectionExpr'
import SectionEduc from './SectionEduc'

const RightBox = ({ data = {}, highlight }) => {
  return (
    <div id='CONTAINER_1' className='right-box'>
      <div
        data-react-beautiful-dnd-draggable='1'
        className='sortable-item section-container SortableItem-sibling  data-SUMM'
      >
        <div className='document-tool sec-tool' id='editIcons'></div>
        <SectionSummary />
      </div>
      <div
        data-react-beautiful-dnd-draggable='1'
        className='sortable-item section-container SortableItem-sibling  data-EXPR'
      >
        <div className='document-tool sec-tool' id='editIcons'></div>
        <SectionExpr highlight={highlight === 'expr'} />
      </div>
      <div
        data-react-beautiful-dnd-draggable='1'
        className='sortable-item section-container SortableItem-sibling  data-EDUC'
      >
        <div className='document-tool sec-tool' id='editIcons'></div>
        <SectionEduc highlight={highlight === 'educ'} />
      </div>
    </div>
  )
}

RightBox.propTypes = {
  data: PropTypes.object,
  highlight: PropTypes.string,
}

export default RightBox