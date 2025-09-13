interface CellProps {
  value: string
}

function selectColors(value: string): string {
  switch (value) {
    case 'EMPTY': return 'bg-blue-800'
    case 'V2': return 'bg-amber-950 text-gray-100'
    case 'V4': return 'bg-amber-900 text-gray-200'
    case 'V8': return 'bg-amber-800 text-gray-300'
    case 'V16': return 'bg-amber-700 text-gray-800'
    case 'V32': return 'bg-amber-600 text-gray-800'
    case 'V64': return 'bg-amber-500 text-gray-800'
    case 'V128': return 'bg-amber-400 text-gray-800'
    case 'V256': return 'bg-amber-300'
    case 'V512': return 'bg-amber-200'
    case 'V1024': return 'bg-amber-100'
    case 'V2048': return 'bg-amber-50'
    default: return 'bg-amber-800'
  }
}

export default function Cell({ value }: CellProps) {
  const colors = selectColors(value)
  return (
    <div className={`w-16 h-16 ${colors} border border-gray-300 flex items-center justify-center font-bold`}>
      {value === 'EMPTY' ? '' : value.substring(1)}
    </div>
  )
}
