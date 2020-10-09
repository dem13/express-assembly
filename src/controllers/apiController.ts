import {Request, Response} from 'express'

class ApiController {
  public index = (req: Request, res: Response) => {
    res.send({
      version: '1.0'
    })
  }
}

export default ApiController;