import * as echarts from 'echarts'
import { useRef, useEffect } from 'react'
function Bar({ title, XData, SData, style }) {
  const DomRef = useRef(null)
  useEffect(() => {
    echartsInit()
  })
  const echartsInit = () => {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(DomRef.current)
    // 绘制图表
    myChart.setOption({
      title: {
        text: title,
      },
      tooltip: {},
      xAxis: {
        data: XData,
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: SData,
        },
      ],
    })
  }
  return <div ref={DomRef} style={style}></div>
}

export default Bar
