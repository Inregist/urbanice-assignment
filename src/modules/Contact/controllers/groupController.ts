import { Router } from 'express';
import { handleCommonControllerError } from '../../../utils/errorHandler';
import { GroupService } from '../services';

const GroupRouter = Router();

GroupRouter.get('/groups', (_, res) => {
  res.json(GroupService.list());
});

GroupRouter.get('/groups/:id', (req, res) => {
  try {
    const { id } = req.params;
    const group = GroupService.findById(id);

    if (group) res.json(group);
    else res.status(404).json({ error: `group not found` });
  } catch (error) {
    handleCommonControllerError(error, res);
  }
});

GroupRouter.post('/groups', (req, res) => {
  try {
    res.json(GroupService.create(req.body));
  } catch (error) {
    handleCommonControllerError(error, res);
  }
});

GroupRouter.patch('/groups/:id', (req, res) => {
  try {
    const { id } = req.params;
    const group = GroupService.update(id, req.body);

    if (group) res.json(group);
    else res.status(404).json({ error: `group not found` });
  } catch (error) {
    handleCommonControllerError(error, res);
  }
});

GroupRouter.delete('/groups/:id', (req, res) => {
  try {
    const { id } = req.params;
    const groupId = GroupService.delete(id);

    if (groupId) res.json({ id: groupId });
    else res.status(404).json({ error: `group not found` });
  } catch (error) {
    handleCommonControllerError(error, res);
  }
});

export default GroupRouter;
