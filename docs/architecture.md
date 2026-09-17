# Architecture

Web Components are the platform-level distribution format; Stencil supplies typed authoring, efficient output, and generated declarations. Shadow DOM prevents accidental selector coupling while CSS custom properties cross the boundary. The token dependency direction is primitive → semantic → component → implementation, so themes change intent without rewriting components.

Storybook registers and renders the built custom elements. Vanilla and React examples consume only package exports. Keeping one package avoids workspace plumbing that would obscure the starter's purpose. The root export provides the lazy distribution, `loader` registers it, `components/*` exposes auto-defined custom-element modules, and `styles` exposes tokens.

Customization is deliberately ordered: tokens, properties/attributes, slots, events, then narrowly exposed parts. Releases use Changesets and semantic versioning. The generic `ds-` prefix must be replaced by real adopters to prevent registry collisions.
