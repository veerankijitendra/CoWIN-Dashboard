import {ResponsiveContainer, Pie, PieChart, Cell, Legend} from 'recharts'

import './index.css'

const VaccinationByGender = props => {
  const {vaccinationByGender} = props

  return (
    <div className="pie-chart">
      <h1 className="pie-chart-heading">Vaccination by gender</h1>
      <ResponsiveContainer width="100%" height={600}>
        <PieChart>
          <Pie
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            data={vaccinationByGender}
            dataKey="count"
            innerRadius="40%"
            outerRadius="70%"
          >
            <Cell name="male" fill="#f54394" />
            <Cell name="female" fill="#5a8dee" />
            <Cell name="others" fill="#2cc6c6" />
          </Pie>

          <Legend iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByGender
