import {Request, Response} from 'express'

class AdminController {
  constructor() {
    console.log('I am alive...');
  }

  public index = (req: Request, res: Response) => {
    res.send({
      admin: 'Admin...'
    })
  }
}

export default AdminController;