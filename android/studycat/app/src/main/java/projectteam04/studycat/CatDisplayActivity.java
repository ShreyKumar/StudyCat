package projectteam04.studycat;


import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.support.v4.content.LocalBroadcastManager;
import android.support.v7.app.AppCompatActivity;
import android.widget.ImageView;
import android.app.Activity;
import android.os.Bundle;
import android.widget.Button;
import android.view.View;
import android.view.View.OnClickListener;

import com.loopj.android.http.AsyncHttpResponseHandler;

import com.google.gson.Gson;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Map;

import cz.msebera.android.httpclient.Header;
import projectteam04.studycat.query.CatData;

/**
 * Created by jefflin on 2017-11-30.
 */

public class CatDisplayActivity extends AppCompatActivity {

    // Image references
    int[] imageArray = { R.drawable.cat_0,
            R.drawable.cat_1,
            R.drawable.cat_2,
            R.drawable.cat_3,
            R.drawable.cat_4};

    // UI references.
    ImageView catImage;
    Button button;
    int counter = 2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_cat_display);

        catImage = (ImageView) findViewById(R.id.catImageView);
        startMonitor();
        LocalBroadcastManager.getInstance(this).registerReceiver(
                new BroadcastReceiver() {
                    @Override
                    public void onReceive(Context context, Intent intent) {
                        counter = intent.getIntExtra(BackgroundMonitorService.EXTRA_COUNTER, 3);
                        catImage.setImageResource(imageArray[counter]);
                    }
                }, new IntentFilter(BackgroundMonitorService.ACTION_BACKGROUND)
        );

    }

    @Override
    protected void onResume() {
        super.onResume();
        startService(new Intent(this, BackgroundMonitorService.class));
    }

    @Override
    protected void onPause() {
        super.onPause();
        stopService(new Intent(this, BackgroundMonitorService.class));
    }


    private void startMonitor() {
        Intent catStateService = new Intent(this, BackgroundMonitorService.class);
        catStateService.putExtra("test", ":thinking:");
        this.startService(catStateService);
    }



}
