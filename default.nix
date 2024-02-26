{ pkgs ? import <nixpkgs> {}}:

pkgs.mkShell {
  nativeBuildInputs = [ pkgs.nodePackages.yarn pkgs.nodejs_21];
}
