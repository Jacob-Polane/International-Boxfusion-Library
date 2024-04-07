import { TableColumnsType} from 'antd';
import { IBook } from '../../models/interface';

const useHistoryHelper=()=>{
    const columns: TableColumnsType<IBook> = [
        {
          title: 'title',
          dataIndex: 'title',
          key: 'title',
          width: '30%'
          
        },
        {
          title: 'author',
          dataIndex: 'author',
          key: 'author',
          width: '20%'
         
        },
        {
            title: 'category',
            dataIndex: 'category',
            key: 'category',
            width: '20%'
            
        },
        {
            title: 'status',
            dataIndex: 'status',
            key: 'status',
            width: '20%',
            render: (status: number) => getStatusText(status)
        }
      ];
    
    const getStatusText = (status: number): string => {
        switch (status) {
            case 1:
                return 'Pending';
            case 2:
                return 'Ready To Be Collected';
            case 3:
                return 'Collected';
            case 4:
              return 'Returned';
            // Add more cases as needed
            default:
                return 'Unknown';
        }
    };
    return {columns};
}

export default useHistoryHelper;