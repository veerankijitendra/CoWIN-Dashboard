import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const statusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  failure: 'failure',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {dashBoardDetails: {}, apiStatus: statusConstants.initial}

  componentDidMount() {
    this.getGraphData()
    // this.setState({apiStatus: statusConstants.failure})
  }

  getGraphData = async () => {
    this.setState({apiStatus: statusConstants.loading})
    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(vaccinationDataApiUrl)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        last7DaysVaccination: data.last_7_days_vaccination,
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }
      this.setState({
        dashBoardDetails: {...updatedData},
        apiStatus: statusConstants.inProgress,
      })
    } else {
      this.setState({apiStatus: statusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-con" testid="loader">
      <Loader type="ThreeDots" color="#cbd5e1" width={80} height={80} />
    </div>
  )

  renderGraphComponents = () => {
    const {dashBoardDetails} = this.state
    const {
      last7DaysVaccination,
      vaccinationByAge,
      vaccinationByGender,
    } = dashBoardDetails

    return (
      <>
        <VaccinationCoverage last7DaysVaccination={last7DaysVaccination} />
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-con">
      <img
        alt="failure view"
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
      />
      <h1 className="failure-view-heading">Something went wrong</h1>
    </div>
  )

  renderCowinSwitches = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case statusConstants.initial:
        return null
      case statusConstants.loading:
        return this.renderLoader()
      case statusConstants.inProgress:
        return this.renderGraphComponents()
      case statusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-co-win-con">
        <div className="responsive-con">
          <nav className="nav-con">
            <img
              alt="website logo"
              className="logo-image"
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png "
            />
            <h1 className="co-win-heading">Co-Win</h1>
          </nav>
          <h1 className="main-heading">CoWIN Vaccination in India</h1>
          <div>{this.renderCowinSwitches()}</div>
        </div>
      </div>
    )
  }
}

export default CowinDashboard
