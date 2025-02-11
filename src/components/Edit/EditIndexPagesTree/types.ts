import { NodeModel } from '@minoru/react-dnd-treeview'
import { IpfsIndexPageType } from 'src/shared/utils'

export type EditNodeModelData = { type?: IpfsIndexPageType }

export type EditNodeModel = NodeModel<EditNodeModelData>
