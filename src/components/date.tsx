import DatePicker, { registerLocale } from 'react-datepicker';
import { ja } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('ja', ja);

interface Props {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  className?: string;
}

const MyDatePicker: React.FC<Props> = ({ selected, onChange, className }) => (
  <DatePicker
    selected={selected}
    onChange={onChange}
    locale="ja"
    dateFormat="yyyy/MM/dd"
    placeholderText="日付を選択"
    className={className}
  />
);

export default MyDatePicker;
