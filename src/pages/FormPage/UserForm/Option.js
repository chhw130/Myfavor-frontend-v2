import { useQuery } from "react-query";
import { getIdolList } from "../../../axios-settings/Axios";

const Option = () => {
  const { data: idolList } = useQuery(["idol"], () => getIdolList());

  /**최애 옵션 */

  return (
    <>
      {idolList?.map((data) => (
        <option key={data.pk} value={data.pk}>
          {data.idol_name_kr}
        </option>
      ))}
    </>
  );
};

export default Option;
