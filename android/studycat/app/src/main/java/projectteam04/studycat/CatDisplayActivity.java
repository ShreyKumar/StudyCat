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
            R.drawable.cat_happy,
            R.drawable.cat_3,
            R.drawable.cat_4};

    // UI references.
    ImageView catImage;
    Button button;
    BroadcastReceiver receiver;
    int counter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_cat_display);

        catImage = (ImageView) findViewById(R.id.catImageView);
        receiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                counter = intent.getIntExtra(BackgroundMonitorService.EXTRA_COUNTER, 2);
                catImage.setImageResource(imageArray[counter]);
            }
        };

        startMonitor();
    }
    @Override
    protected void onStart() {
        super.onStart();
        LocalBroadcastManager.getInstance(this).registerReceiver((receiver),
                new IntentFilter(BackgroundMonitorService.ACTION_BACKGROUND)
        );
    }

    @Override
    protected void onStop() {
        LocalBroadcastManager.getInstance(this).unregisterReceiver(receiver);
        super.onStop();
    }

    private void startMonitor() {
        Intent backgroundService = new Intent(this, BackgroundMonitorService.class);
        backgroundService.putExtra("test", ":thinking:");
        this.startService(backgroundService);
    }



}
