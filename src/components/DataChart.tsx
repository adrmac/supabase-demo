// Chart.js auto bundle is easier for demos, for production import each component like this
// import {
//   Chart,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// } from 'chart.js';

// Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


import Chart from 'chart.js/auto';


import { useEffect, useMemo, useRef, useState } from 'react'
import { supabase } from '../supabaseClient'



export default function DataChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const [dataPoints, setDataPoints] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from('data_points')
        .select('*')
        .order('timestamp', { ascending: true })

      console.log("Supabase data", data)
      console.log("Supabase error", error)


      if (data) setDataPoints(data)
    }
    fetchData()
  }, [])

 const chartData = useMemo(() => {
  const data = {
    labels: dataPoints.map(dp => new Date(dp.timestamp).toLocaleDateString()),
    datasets: [
      {
        label: 'Environmental Value',
        data: dataPoints.map(dp => dp.value),
        borderColor: 'teal',
        fill: false,
      },
    ],
  }
  console.log("data", JSON.stringify(data))
  return data;
 }, [dataPoints])


  useEffect(() => {
    if (chartRef.current) {
      // Destroy previous chart if it exists
      chartInstanceRef.current?.destroy();

      chartInstanceRef.current = new Chart(chartRef.current, {
        type: 'bar',
        data: chartData,
        options: { responsive: true }
      })
    }

    return () => {
      chartInstanceRef.current?.destroy();
    }

  }, [chartData])

  return <canvas ref={chartRef} />
}
