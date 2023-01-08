{ pkgs ? import <nixpkgs> {}}:

pkgs.mkShell {
  nativeBuildInputs = [ pkgs.nodePackages.yarn pkgs.nodejs-16_x pkgs.cypress ];
}
