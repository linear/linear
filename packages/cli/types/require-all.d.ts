declare module "require-all" {
  interface RequireOptions {
    dirname: string;
    filter?: RegExp;
    excludeDirs?: RegExp;
    recursive?: boolean;
  }
  export default function requireAll<T>(options: RequireOptions): { [moduleName: string]: T };
}
