import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Autosuggest from 'react-autosuggest'
import ZTooltip from '../ZTooltip'
import './index.scss'

const languages = [
  {
    name: 'C',
    year: 1972,
  },
  {
    name: 'Elm',
    year: 2012,
  },
]

/**
 * @component
 * @param {element}    label
 * @param {string}    id
 * @param {string}    name
 * @param {string}    placeholder
 * @param {number}    maxLength
 * @param {string}    className
 * @param {string}    value
 * @param {function}  onChange
 * @param {string}    tooltip
 *
 * @version 0.0.1
 */

const getSuggestions = value => {
  const inputValue = value.toLowerCase()
  const inputLength = inputValue.length

  return inputLength === 0
    ? []
    : languages.filter(lang => lang.name.toLowerCase().slice(0, inputLength) === inputValue)
}

const ZSearch = ({
  id,
  className,
  label,
  name,
  placeholder,
  maxLength,
  value,
  onChange,
  tooltip,
}) => {
  const [suggestions, setSuggestions] = useState([])
  const formGroupClass = classnames('z-search', className)

  return (
    <div className={formGroupClass}>
      <label className='control-label' htmlFor={id}>
        {label}
      </label>
      <Autosuggest
        id={id}
        suggestions={suggestions}
        onSuggestionsFetchRequested={input => setSuggestions(getSuggestions(input.value))}
        onSuggestionsClearRequested={() => setSuggestions([])}
        getSuggestionValue={suggestion => suggestion.name}
        renderSuggestion={suggestion => <span>{suggestion.name}</span>}
        inputProps={{
          name,
          value,
          onChange,
          maxLength,
          placeholder,
          className: 'form-control',
        }}
      />
      <FontAwesomeIcon icon={faSearch} />
      <ZTooltip className='search-tool-tip'>
        Want to see more pre-written examples? Try searching for another title.
      </ZTooltip>
    </div>
  )
}

ZSearch.propTypes = {
  className: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func,
  tooltip: PropTypes.string,
}

export default ZSearch
