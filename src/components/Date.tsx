import DatePicker, { registerLocale } from 'react-datepicker';
import { ja } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('ja', ja);

interface Props {
  className?: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
}

// MyDatePicker コンポーネント
// 日付を選択できるカレンダーを表示する
// 日付選択後、親側の更新処理(onChange)を呼び出す
const MyDatePicker: React.FC<Props> = ({
  className,
  selected,
  onChange,
}) => (
  <DatePicker
    className={className}
    selected={selected}
    onChange={onChange}
    locale="ja"
    dateFormat="yyyy/MM/dd"
    placeholderText="日付を選択"
  />
);

export default MyDatePicker;
