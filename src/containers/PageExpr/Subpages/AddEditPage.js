import React from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'react-bootstrap'
import { ZButton, ZButtonGroupFooter } from 'components/themes.js'
import { useFormik } from 'formik'
import * as yup from 'yup'
import TipContainer from 'containers/TipContainer'
import { TipContentExpr } from 'containers/TipContainer/Contents'
import AboutJobForm from './AboutJobForm'
import './AddEditPage.scss'

/**
 * @page
 * @route /resume/section/expr
 * @subpage Add or Edit Job
 *
 * @param {object}    info  (resume info)
 * @param {function}  onNext
 *
 * @version 0.0.1
 */

const schema = yup.object({
  startDate: yup.date(),
  endDate: yup
    .date()
    .when(
      'startDate',
      (startDate, sch) =>
        startDate && sch.min(startDate, `Your end date can't be before the start date.`),
    ),
})

const AddEditPage = ({ info, onNext }) => {
  const formik = useFormik({
    initialValues: {
      position: '',
      company: '',
      jobcity: '',
      jobstate: '',
      startDate: undefined,
      endDate: undefined,
      currentJob: false,
      description: '',
    },
    validationSchema: schema,
    onSubmit: (values, actions) => {
      console.log('onSubmit', values)
      onNext(values)
    },
  })

  const onSubmit = e => {
    formik.handleSubmit()
  }

  return (
    <Container className='section-expr section-expr-addedit'>
      <Row className='page-title-wrap'>
        <Col xs={9} className='col-page-title'>
          <h1 className='page-title'>Tell us about another job</h1>
          <p className='sub-title'>We’ll put your work history in the right order.</p>
        </Col>
        <Col xs={3} className='col-preview-tips'>
          <TipContainer data={{ ...info, expr: [formik.values] }}>
            <TipContentExpr />
          </TipContainer>
        </Col>
      </Row>
      <AboutJobForm formik={formik} />
      <ZButtonGroupFooter>
        <ZButton variant='default'>Back</ZButton>
        <ZButton variant='primary' onClick={onSubmit}>
          NEXT
        </ZButton>
      </ZButtonGroupFooter>
    </Container>
  )
}

AddEditPage.propTypes = {
  info: PropTypes.object,
  onNext: PropTypes.func,
}

export default AddEditPage
