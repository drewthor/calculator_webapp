package gcloud

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/drewthor/calculator_webapp/server/pkg/gcloud"
)

type calculation struct {
	Calculation string `json:"calculation"`
}

func Receive(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodOptions:
		w.Header().Set("Access-Control-Allow-Origin", "https://drewthor.github.io")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Origin, Referer, User-Agent")
		w.Header().Set("Access-Control-Max-Age", "3600")
		w.WriteHeader(http.StatusOK)
		return
	case http.MethodGet:
		datastore := new(gcloud.Datastore)
		calculations, received := datastore.GetLastTenCalculations()
		if received && calculations != nil {
			calculationsJSON, err := json.Marshal(*calculations)
			if err != nil {
				w.Header().Set("Content-Type", "application/json")
				w.WriteHeader(http.StatusOK)
				w.Write(calculationsJSON)
			} else {
				http.Error(w, "404 - Not Found", http.StatusNotFound)
			}
		} else {
			http.Error(w, "404 - Not Found", http.StatusNotFound)
		}
	case http.MethodPost:
		var c calculation
		if err := json.NewDecoder(r.Body).Decode(&c); err != nil {
			fmt.Fprint(w, "Hello, World!")
			return
		}
		datastore := new(gcloud.Datastore)
		datastore.SaveCalculation(gcloud.Calculation{c.Calculation, time.Now()})
	default:
		http.Error(w, "405 - Method Not Allowed", http.StatusMethodNotAllowed)
	}
}
