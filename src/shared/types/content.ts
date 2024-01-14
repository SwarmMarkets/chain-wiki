export interface ContentItemChild {
  id: number;
  title: string;
  elem: Element;
  tag: string;
}

export interface ContentItemParent extends ContentItemChild {
  childs: ContentItemChild[] | null;
}