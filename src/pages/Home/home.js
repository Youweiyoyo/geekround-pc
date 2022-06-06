import Bar from '@/pages/Components/Bar/bar'
const Home = () => {
  return (
    <div>
      <Bar
        title={'框架趋势'}
        style={{ width: '500px', height: '500px' }}
        XData={['vue', 'angular', 'react']}
        SData={[50, 60, 70]}
      />
    </div>
  )
}
export default Home
