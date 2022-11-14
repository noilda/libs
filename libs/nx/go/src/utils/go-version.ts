import { execSync } from 'child_process';

const REGEX_VERSION_GO = /go(?<version>\S+) /;

export function goVersion(): {
  version: string;
  major: number;
  minor: number;
  patch: number;
} {
  const output = execSync('go version');

  if (!output) {
    throw new Error('Unable to parse go version');
  }

  const version = REGEX_VERSION_GO.exec(output.toString()).groups.version;
  const [major, minor, patch] = version.toString().split('.');

  return {
    version,
    major: parseInt(major) || 0,
    minor: parseInt(minor) || 0,
    patch: parseInt(patch) || 0,
  };
}