import { Image, ImageProps } from 'expo-image';
import React, { memo, useMemo } from 'react'; // 1. Импортираме memo
import { StyleSheet, View } from 'react-native';

interface Props extends Partial<ImageProps> {
  uri?: string;
  size?: number;
}

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?q=80&w=200';

const DealImageComponent = ({ uri, size = 80, }: Props) => {
    const source = useMemo(() => ({ 
        uri: uri || DEFAULT_IMAGE 
    }), [uri]);

    return (
        <View style={[styles.container, { width: size, height: size }]}>
            <Image
                source={source}
                style={styles.image}
                contentFit="cover"
                transition={300}
                cachePolicy="disk"
            />
        </View>
    );
};

export const DealImage = memo(DealImageComponent);

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});