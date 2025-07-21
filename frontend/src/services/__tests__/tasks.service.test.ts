import { getTasks, getTaskById, createTask, updateTask, deleteTask } from '../tasks.service';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('tasks.service', () => {
  it('getTasks returns tasks', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { data: [{ _id: '1', title: 'Task' }] } });
    const result = await getTasks();
    expect(result).toEqual([{ _id: '1', title: 'Task' }]);
    expect(mockedAxios.get).toHaveBeenCalled();
  });

  it('getTaskById returns a task', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { data: { _id: '1', title: 'Task' } } });
    const result = await getTaskById('1');
    expect(result).toEqual({ _id: '1', title: 'Task' });
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('/tasks/1'));
  });

  it('createTask posts and returns a task', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { data: { _id: '2', title: 'New Task' } } });
    const result = await createTask({ title: 'New Task', description: 'desc' });
    expect(result).toEqual({ _id: '2', title: 'New Task' });
    expect(mockedAxios.post).toHaveBeenCalled();
  });

  it('updateTask patches and returns a task', async () => {
    mockedAxios.patch.mockResolvedValueOnce({ data: { data: { _id: '1', title: 'Updated Task' } } });
    const result = await updateTask('1', { title: 'Updated Task', description: 'desc' });
    expect(result).toEqual({ _id: '1', title: 'Updated Task' });
    expect(mockedAxios.patch).toHaveBeenCalledWith(expect.stringContaining('/tasks/1'), { title: 'Updated Task', description: 'desc' });
  });

  it('deleteTask deletes a task', async () => {
    mockedAxios.delete.mockResolvedValueOnce({});
    await expect(deleteTask('1')).resolves.toBeUndefined();
    expect(mockedAxios.delete).toHaveBeenCalledWith(expect.stringContaining('/tasks/1'));
  });
});
