declare module '@splidejs/react-splide' {
    import { ComponentType, ReactNode } from 'react';
    import { Options } from '@splidejs/splide';
  
    export interface SplideProps {
      options?: Options;
      children?: ReactNode;
      hasTrack?: boolean;
    }
  
    export interface SplideSlideProps {
      children?: ReactNode;
    }
  
    export const Splide: ComponentType<SplideProps>;
    export const SplideSlide: ComponentType<SplideSlideProps>;
  }