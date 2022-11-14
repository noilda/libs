import { getWorkspaceLayout, names, Tree } from '@nrwl/devkit';
import {
  ILibraryBaseSchema,
  ILibraryNormalizedBaseSchema,
  INamingConvention,
} from '../types/schema';

/**
 *
 * @param tree {Tree}
 * @param options {ILibraryBaseSchema}
 * @returns {ILibraryNormalizedBaseSchema}
 */
export function normalizeOptions(
  tree: Tree,
  options: ILibraryBaseSchema
): ILibraryNormalizedBaseSchema {
  let normalizedName = namingConvention(options.name, options.namingConvention);

  const normalizedDirectory = options.directory
    ? `${namingConvention(
        options.directory,
        options.namingConvention
      )}/${normalizedName}`
    : normalizedName;

  //Option: false => First it will convert folder1/folder2 in folder1-folder2 and than namingConvention function will
  // make it compatible with the desired naming convention
  normalizedName = options.simpleModuleName
    ? normalizedName
    : namingConvention(
        normalizedDirectory.replace(new RegExp('/', 'g'), '-'),
        options.namingConvention
      );

  const normalizedRoot = `${
    getWorkspaceLayout(tree).libsDir
  }/${normalizedDirectory}`;

  const normalizedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  return {
      ...options,
      ...names(options.name),
      normalizedName,
      projectRoot: normalizedRoot,
      normalizedDirectory,
      normalizedTags,
  };
}

/**
 * NX name types are included to make it back-compatibile.
 *
 * Examples:
 *
 * ```typescript
 * // Input
 * 'my-name' || 'myName'
 *
 * //Output
 *
 * 'NAME' =>  //does not make modifications
 * 'CONSTANTNAME'  =>  'MY_NAME'
 * 'CLASSNAME' | 'PASCAL' =>  'MyName'
 * 'PROPERTYNAME' | 'CAMEL'  =>  'myName'
 * 'FILENAME' | 'KEBAP' => 'my-name'
 * 'SNAKE' => 'my_name'
 *
 * ```
 */

function namingConvention(
  name: string,
  namingConvention: INamingConvention
): string {
  const _nameTmp = names(name);

  switch (namingConvention) {
    case 'SNAKE':
      return _nameTmp.fileName.replace(new RegExp('-', 'g'), '_');
    case 'CONSTANTNAME':
      return _nameTmp.constantName;
    case 'CLASSNAME':
    case 'PASCAL':
      return _nameTmp.className;
    case 'PROPERTYNAME':
    case 'CAMEL':
      return _nameTmp.propertyName;
    case 'FILENAME':
    case 'KEBAP':
    default:
      return _nameTmp.fileName;
  }
}
