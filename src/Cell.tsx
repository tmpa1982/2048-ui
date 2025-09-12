interface CellProps {
  value: string
}

export default function Cell({ value }: CellProps) {
  const bgColor = value === 'EMPTY' ? 'bg-blue-800' : 'bg-amber-800'
  return (
    <div className={`w-16 h-16 ${bgColor} border border-gray-300 flex items-center justify-center font-bold`}>
      {value === 'EMPTY' ? '' : value.substring(1)}
    </div>
  )
}
