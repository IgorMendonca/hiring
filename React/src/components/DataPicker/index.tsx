import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardDatePickerProps
} from '@material-ui/pickers'
import {ptBR} from 'date-fns/locale'

import {formatDataString} from '../../util/format'

interface IDataPicker extends KeyboardDatePickerProps {
  fullWidth?: boolean
  style?: any
}

export default function DataPicker({fullWidth, style, ...props}: IDataPicker) {
  return (
    <MuiPickersUtilsProvider locale={ptBR} utils={DateFnsUtils}>
      <KeyboardDatePicker
        {...props}
        autoOk
        disableToolbar
        format={formatDataString}
        variant="inline"
        margin="dense"
        style={{margin: '0px', width: fullWidth && '100%', ...style}}
      />
    </MuiPickersUtilsProvider>
  )
}
