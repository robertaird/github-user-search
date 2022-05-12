import _styled from '@emotion/styled';

const styled = ((component: any, config: any) => {
  config = {
    shouldForwardProp: (prop: string) => !prop.startsWith('$'),
    ...config,
  };
  return _styled(component, config);
}) as typeof _styled;

for (const tag of Object.keys(_styled)) {
  (styled as any)[tag] = styled(tag as any);
}

export default styled;
