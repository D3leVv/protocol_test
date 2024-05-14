export enum ActiveTheme {
  base = 'base',
  rainforest = 'rainforest',
  candy = 'candy',
}
export type DeepReadonly<T> = Readonly<{
  [K in keyof T]: T[K] extends number | string | symbol
    ? Readonly<T[K]>
    : T[K] extends Array<infer A>
      ? Readonly<Array<DeepReadonly<A>>>
      : DeepReadonly<T[K]>
}>

export type PropsOf<
  C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>,
> = JSX.LibraryManagedAttributes<C, React.ComponentPropsWithoutRef<C>>

type AsProp<C extends React.ElementType> = {
  as?: C
}

export type ExtendableProps<
  ExtendedProps = unknown,
  OverrideProps = unknown,
> = OverrideProps & Omit<ExtendedProps, keyof OverrideProps>

export type InheritableElementProps<
  C extends React.ElementType,
  Props = unknown,
> = ExtendableProps<PropsOf<C>, Props>

export type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = unknown,
> = InheritableElementProps<C, Props & AsProp<C>>

export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>['ref']

export type PolymorphicComponentPropsWithRef<
  C extends React.ElementType,
  Props = unknown,
> = PolymorphicComponentProps<C, Props> & { ref?: PolymorphicRef<C> }

export type EnsureArray<T> = T extends any[] ? T : Expand<T>[]

export type Expand<T> = T extends infer O
  ? {
      [K in keyof O]: O[K]
    }
  : never
