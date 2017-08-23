#include <pebble.h>
bool js_ready = false;
//uint8_t command = 0;
char textbuffer[500] = "";
char message[100] = "Waiting for JavaScript...";
int cursor = 0;
int cursormax = 5;

static Window *window;

static TextLayer    *text_layer;
static Layer        *graphics_layer;
static Layer        *root_layer;
static GRect         root_frame;

#define COMMAND_PLAY_NOTES   10
#define COMMAND_CHANGE_CHORD 11
#define COMMAND_STOP         12
#define COMMAND_PLAY_MARIO   13
#define COMMAND_PLAY_ZELDA   14
#define COMMAND_PLAY_TETRIS  15


// ------------------------------------------------------------------------ //
//  AppMessage Functions
// ------------------------------------------------------------------------ //
#define ICON '>'
static void update_text() {
  snprintf(textbuffer, sizeof(textbuffer),
           "%s\n%c Mario\n%c Zelda\n%c Tetris\n%c Stop\n%c Notes\n%c Chord",
           message, cursor==0?ICON:' ',cursor==1?ICON:' ',cursor==2?ICON:' ',cursor==3?ICON:' ',cursor==4?ICON:' ',cursor==5?ICON:' '
          );
  layer_set_frame(text_layer_get_layer(text_layer), GRect(0,0,1000,1000));
  text_layer_set_text(text_layer, textbuffer);
  GRect rect = {.origin = {0, 0}, .size = text_layer_get_content_size(text_layer)};
  //rect.size = text_layer_get_content_size(text_layer);
  //rect.origin.x = 0;
  rect.origin.y = (root_frame.size.h - rect.size.h) / 2;
  rect.size.w = root_frame.size.w;
  rect.size.h += 4;
  layer_set_frame(text_layer_get_layer(text_layer), rect);
  layer_mark_dirty(root_layer);
}

static void set_text(char *text) {
  snprintf(message, sizeof(message), "%s", text);
  update_text();
}

static void set_error_text(char *error, char *text) {
  APP_LOG(APP_LOG_LEVEL_ERROR, "%s: %s", error, text);
  set_text(text);
}


static void send_command(uint8_t command) {
  printf("Sending Command: %d", command);
  if (!js_ready) {
    set_error_text("Cannot send command", "Javascript not ready");
    return;
  }
  DictionaryIterator *iter;
  if (app_message_outbox_begin(&iter)) {set_error_text("Cannot send command", "Error Preparing Outbox"); return;}
  if (dict_write_uint8(iter, MESSAGE_KEY_COMMAND, command)) {set_error_text("Cannot send command", "Failed to write uint8"); return;}
  dict_write_end(iter);
  app_message_outbox_send();
}


static void appmessage_in_received_handler(DictionaryIterator *iter, void *context) {
  js_ready = true;
  
  Tuple *message_tuple = dict_find(iter, MESSAGE_KEY_MESSAGE);
  if(message_tuple){
    //text_layer_set_text(text_layer, message_tuple->value->cstring);
    set_text(message_tuple->value->cstring);
  }

  // If update GPS 32bit coords
//   Tuple *lat_tuple  = dict_find(iter, KEY_GPS_LAT);
//   Tuple *lon_tuple  = dict_find(iter, KEY_GPS_LON);
//   if(lat_tuple && lon_tuple) {
//     int32_t lat = lat_tuple->value->int32;
//     int32_t lon = lon_tuple->value->int32;
//     printf("Received new map coords: (%d, %d)", (int)lat, (int)lon);
    
//   }
}



static char *translate_appmessageresult(AppMessageResult result) {
  switch (result) {
    case APP_MSG_OK:                          return "APP_MSG_OK";
    case APP_MSG_SEND_TIMEOUT:                return "APP_MSG_SEND_TIMEOUT";
    case APP_MSG_SEND_REJECTED:               return "APP_MSG_SEND_REJECTED";
    case APP_MSG_NOT_CONNECTED:               return "APP_MSG_NOT_CONNECTED";
    case APP_MSG_APP_NOT_RUNNING:             return "APP_MSG_APP_NOT_RUNNING";
    case APP_MSG_INVALID_ARGS:                return "APP_MSG_INVALID_ARGS";
    case APP_MSG_BUSY:                        return "APP_MSG_BUSY";
    case APP_MSG_BUFFER_OVERFLOW:             return "APP_MSG_BUFFER_OVERFLOW";
    case APP_MSG_ALREADY_RELEASED:            return "APP_MSG_ALREADY_RELEASED";
    case APP_MSG_CALLBACK_ALREADY_REGISTERED: return "APP_MSG_CALLBACK_ALREADY_REGISTERED";
    case APP_MSG_CALLBACK_NOT_REGISTERED:     return "APP_MSG_CALLBACK_NOT_REGISTERED";
    case APP_MSG_OUT_OF_MEMORY:               return "APP_MSG_OUT_OF_MEMORY";
    case APP_MSG_CLOSED:                      return "APP_MSG_CLOSED";
    case APP_MSG_INTERNAL_ERROR:              return "APP_MSG_INTERNAL_ERROR";
    default:                                  return "UNKNOWN ERROR";
  }
}


static void appmessage_out_failed_handler(DictionaryIterator *iterator, AppMessageResult reason, void *context) {
  js_ready = false;
  printf("App Message Failed: %s", translate_appmessageresult(reason));
  set_error_text("App Message Failed", translate_appmessageresult(reason));
}


static void appmessage_in_dropped_handler(AppMessageResult reason, void *context) {
  js_ready = false;
  printf("App Message Failed: %s", translate_appmessageresult(reason));
  set_error_text("App Message Failed", translate_appmessageresult(reason));
}


static void app_message_init() {
  // Register message handlers
  app_message_register_inbox_received(appmessage_in_received_handler); 
  app_message_register_inbox_dropped(appmessage_in_dropped_handler); 
  app_message_register_outbox_failed(appmessage_out_failed_handler);
  // Init buffers
  // Size = 1 + 7 * N + size0 + size1 + .... + sizeN
  //app_message_open(app_message_inbox_size_maximum(), app_message_outbox_size_maximum());  // <-- bad idea. lotsa ram eaten
  //app_message_open(1 + 7 * 2 + sizeof(int32_t) + PNG_CHUNK_SIZE, APP_MESSAGE_OUTBOX_SIZE_MINIMUM);
  app_message_open(640, 640);  // <-- ought to be enough for anybody
}





// ------------------------------------------------------------------------ //
//  Drawing Functions
// ------------------------------------------------------------------------ //


void graphics_layer_update(Layer *layer, GContext *ctx) {

}




// ------------------------------------------------------------------------ //
//  Button Functions
// ------------------------------------------------------------------------ //
static void up_click_handler(ClickRecognizerRef recognizer, void *context) {
  //send_command(COMMAND_STOP);
  cursor = cursor>0 ? cursor - 1 : cursormax;
  update_text();
}

static void dn_click_handler(ClickRecognizerRef recognizer, void *context) {
  //send_command(COMMAND_CHANGE_CHORD);
  cursor = cursor<cursormax ? cursor + 1 : 0;
  update_text();
}


// #define COMMAND_PLAY_NOTES   10
// #define COMMAND_CHANGE_CHORD 11
// #define COMMAND_STOP         12
// #define COMMAND_PLAY_MARIO   13
// #define COMMAND_PLAY_ZELDA   14
// #define COMMAND_PLAY_TETRIS  15

static void sl_click_handler(ClickRecognizerRef recognizer, void *context) {
  switch(cursor) {
    case 0: send_command(COMMAND_PLAY_MARIO); break;
    case 1: send_command(COMMAND_PLAY_ZELDA); break;
    case 2: send_command(COMMAND_PLAY_TETRIS); break;
    case 3: send_command(COMMAND_STOP); break;
    case 4: send_command(COMMAND_PLAY_NOTES); break;
    case 5: send_command(COMMAND_CHANGE_CHORD); break;
  }
}

static void click_config_provider(void *context) {
  window_single_click_subscribe(BUTTON_ID_UP,     up_click_handler);
  window_single_click_subscribe(BUTTON_ID_SELECT, sl_click_handler);
  window_single_click_subscribe(BUTTON_ID_DOWN,   dn_click_handler);
}

// ------------------------------------------------------------------------ //
//  Main Functions
// ------------------------------------------------------------------------ //
static void window_load(Window *window) {
  root_layer = window_get_root_layer(window);
  root_frame = layer_get_frame(root_layer);

  graphics_layer = layer_create(root_frame);
  layer_set_update_proc(graphics_layer, graphics_layer_update);
  layer_add_child(root_layer, graphics_layer);
  
  text_layer = text_layer_create(GRect(0, (root_frame.size.h - 30) / 2, root_frame.size.w, 30));
  text_layer_set_text(text_layer, "Waiting for\nJavaScript...");
  text_layer_set_font(text_layer, fonts_get_system_font(FONT_KEY_GOTHIC_14_BOLD));
  text_layer_set_text_alignment(text_layer, GTextAlignmentCenter);
  text_layer_set_background_color(text_layer, GColorClear);
  layer_add_child(root_layer, text_layer_get_layer(text_layer));
  
  printf("Waiting for Javascript...");
}

static void window_unload(Window *window) {
  layer_destroy(graphics_layer);
}

static void init(void) {
  app_message_init();
  window = window_create();
  window_set_click_config_provider(window, click_config_provider);
  window_set_window_handlers(window, (WindowHandlers) {
    .load = window_load,
    .unload = window_unload,
  });
  window_stack_push(window, true);
}

static void deinit(void) {
  window_destroy(window);
}

int main(void) {
  init();
  app_event_loop();
  deinit();
}
