package com.newproj;

import androidx.annotation.NonNull;
import androidx.core.widget.NestedScrollView;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

public class NestedScrollViewModule extends SimpleViewManager<NestedScrollView> {
    ReactApplicationContext reactContext;
    NestedScrollView nestedScrollView;

    public NestedScrollViewModule(ReactApplicationContext reactContext) {
        this.reactContext = reactContext;
        nestedScrollView = new NestedScrollView(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "NestedScrollViewModule";
    }

    @NonNull
    @Override
    protected NestedScrollView createViewInstance(@NonNull ThemedReactContext threactContext) {
        return nestedScrollView;
    }
}
