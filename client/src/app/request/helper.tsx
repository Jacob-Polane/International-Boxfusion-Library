import {Select, Table,TableColumnsType,message,Modal} from 'antd';
import { useBookRequestAction, useBookRequestState } from '@/providers/requestBookprovider';
import { IBook } from '../../../models/interface';
import { UpdateStatus } from '@/providers/requestBookprovider/context';

const {Option}=Select;
const {confirm}=Modal;

const useReqHelper=()=>{
    const {changeBookState}=useBookRequestAction();
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
            render: (status: number, record: IBook) => (
                <Select
                    key={record.oid}
                    defaultValue={status}
                    style={{ width: '100%' }}
                    onChange={(value:number) => showConfirm(value, record)}
                >
                    <Option value={1}>Pending</Option>
                    <Option value={2}>Ready To Be Collected</Option>
                    <Option value={3}>Collected</Option>
                    <Option value={4}>Returned</Option>
                </Select>)
        }
      ];
    
      function showConfirm(value: number, record: IBook) {
        confirm({
            title: 'Do you want to save changes?',
            onOk() {
                handleStatusChange(value, record);
            },
            onCancel() {
                // Handle cancel action if needed
            },
        });
    }

    function handleStatusChange(value: number, record: IBook) {
        // Handle the status change here, you might dispatch an action if using Redux or update the state
        console.log(`Book ID ${record.oid} - Status changed to ${value}`);
        var status:UpdateStatus={id:record.oid,status:value}
        if(changeBookState){changeBookState(status)}
    }

    return {columns};
}

export default useReqHelper;