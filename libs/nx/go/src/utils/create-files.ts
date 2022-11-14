import { generateFiles, offsetFromRoot, Tree } from '@nrwl/devkit';
import { ILibraryNormalizedBaseSchema } from '../types/schema';

export function addFiles(
  tree: Tree,
  srcPath: string,
  options: ILibraryNormalizedBaseSchema
) {
  const templateOptions = {
    ...options,
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  };

  generateFiles(tree, srcPath, options.projectRoot, templateOptions);
}
