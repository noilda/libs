export interface ILibraryBaseSchema {
  name: string;
  directory: string;
  tags: string;
  namingConvention?: INamingConvention;
  simpleModuleName?: boolean;
}

export interface ILibraryNormalizedBaseSchema extends ILibraryBaseSchema {
  normalizedName: string;
  normalizedDirectory: string;
  projectRoot: string;
  normalizedTags: string[];
  namingConvention?: INamingConvention;
  simpleModuleName?: boolean;

  name: string;
  className: string;
  propertyName: string;
  constantName: string;
  fileName: string;

  [x: string]: any;
}

export type INamingConvention =
  | 'NAME'
  | 'CLASSNAME'
  | 'PROPERTYNAME'
  | 'CONSTANTNAME'
  | 'FILENAME'
  | 'SNAKE'
  | 'CAMEL'
  | 'PASCAL'
  | 'KEBAP';
